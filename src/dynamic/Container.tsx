import { useEffect, useState } from "react";
import Rate from "./Rate";
import Render from "./Render";

function Container() {
  const [selections, setSelections] = useState<{ [key: string]: string }>({});
  const [render, setRender] = useState(false);

  // Update selections
  const handleSelectionChange = (name: string, value: string) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [name]: value,
    }));
  };

  // Toggle scrolling
  useEffect(() => {
    const body = document.body;
    if (render) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [render]);

  return (
    <div className="relative">
      {" "}
      <div
        className={`flex flex-col mx-auto w-[85%] items-center transition-opacity duration-300 ${
          render ? "opacity-60" : "opacity-100"
        }`}
      >
        <Rate onUpdate={handleSelectionChange} currentSelections={selections} />
        <button
          type="button"
          onClick={() => setRender(true)}
          className="mx-auto my-4 mb-12 py-3 px-6 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20 cursor-pointer"
        >
          Generate
        </button>
      </div>
      {render && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div
            className="flex flex-col w-[70vw] md:w-auto h-auto p-4 items-center bg-white dark:bg-black rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Render selections={selections} />
            <button
              type="button"
              onClick={() => setRender(false)}
              className="mx-auto my-4 py-3 px-6 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Container;
