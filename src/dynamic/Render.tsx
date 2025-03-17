import React, { useRef, useState } from "react";
import aspects from "../data/data.json";

interface RenderProps {
  selections: { [key: string]: string };
}

const Render: React.FC<RenderProps> = ({ selections }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  // Format output
  const displayText = aspects.categories
    .map((category) => {
      const selectedOption = selections[category.title];

      return `---{ ${category.title} }---\n${category.options
        .map((option) => `${option === selectedOption ? "☑" : "☐"} ${option}`)
        .join("\n")}\n`;
    })
    .join("\n");

  return (
    <div
      style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
      className="w-[60vw] h-[80vh]"
    >
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="mx-auto w-full">
          <div className="relative items-center w-full h-full">
            <textarea
              rows={6}
              ref={textAreaRef}
              value={displayText}
              readOnly
              className="w-full h-[70vh] rounded-lg border border-stroke bg-gray-1 p-8 leading-relaxed text-body-color outline-none duration-200 selection:bg-transparent focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-5 top-5 inline-flex h-8 items-center justify-center gap-1 rounded-md border border-stroke bg-white dark:bg-black text-black dark:text-white px-2.5 py-1.5 text-sm font-medium text-dark duration-200 hover:bg-gray-700 hover:dark:bg-gray-700 hover:text-white dark:border-white cursor-pointer"
            >
              <span>
                {copySuccess ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG for the checked icon */}
                    <path
                      d="M17.0394 6.0293L8.03936 15.0293L3.68359 10.6736"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG for the copy icon */}
                    <path
                      d="M17.6875 4.125L14.4062 0.875C14.1875 0.65625 13.875 0.53125 13.5625 0.53125H7.875C6.96875 0.53125 6.21875 1.28125 6.21875 2.1875V13.5937C6.21875 14.5 6.96875 15.25 7.875 15.25H16.375C17.2812 15.25 18.0312 14.5 18.0312 13.5937V4.96875C18.0312 4.65625 17.9062 4.34375 17.6875 4.125Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </span>
              {copySuccess ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Render;
