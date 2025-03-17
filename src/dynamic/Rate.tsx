import aspects from "../data/data.json";

interface RateProps {
  onUpdate: (name: string, value: string) => void;
  currentSelections: { [key: string]: string };
}

const Rate: React.FC<RateProps> = ({ onUpdate, currentSelections }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(event.target.name, event.target.value);
  };

  return (
    <>
      <div className="flex w-full mt-6 justify-center bg-white dark:bg-black overflow-x-hidden">
        <form className="flex flex-wrap sm:gap-5 sm:gap-y-1 w-full mx-auto">
          {aspects.categories.map((category, index) => (
            <fieldset
              id={`field-${index}`}
              data-field-index={index}
              data-hidden="false"
              className="flex rounded-lg my-4 shadow-md border bg-sky-100 dark:bg-gray-500 dark:text-white"
            >
              <legend
                id={`legend-${index}`}
                data-legend-index={index}
                className="mx-4 font-mono font-medium text-lg bg-lime-100 px-4 py-1 rounded-md shadow border-1 border-black dark:bg-indigo-900"
              >
                {category.title}
              </legend>
              <div className="w-full mx-2 mt-1 mb-2 text-md">
                <select
                  id={`select-${index}`}
                  name={category.title}
                  onChange={handleChange}
                  value={currentSelections[category.title] || ""}
                  className="w-[100%] rounded-md p-2 border-gray-300 cursor-pointer justify-between outline-none"
                >
                  <option value="" disabled>
                    - Select one -
                  </option>
                  {category.options.map((item) => (
                    <option
                      value={item}
                      className="text-[3.1vw] sm:text-sm md:text-md border-none outline-none"
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
          ))}
        </form>
      </div>
    </>
  );
};

export default Rate;
