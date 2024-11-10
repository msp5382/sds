import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = "/api/pop"; // Backend API URL

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState<string>("Puun");
  const [isPressed, setIsPressed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchCount(name);
    let controller: AbortController;

    const sync = async (name: string) => {
      try {
        controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const { data } = await axios.get(`/api/sub/${name.toLowerCase()}`, {
          signal: controller.signal,
        });
        clearTimeout(timeout);
        console.log("Data:", data);
        setCount(data.value);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled");
        }
      }
    };

    let breakLoop = false;

    (async () => {
      while (true) {
        if (breakLoop) {
          break;
        }
        await sync(name);
      }
    })();

    return () => {
      breakLoop = true;
      controller.abort();
    };
  }, [name]);

  // Function to update the click count using Axios
  async function updateCount(name: string): Promise<void> {
    try {
      if (!name) {
        throw new Error("Name is undefined or empty");
      }
      const response = await axios.post(`${apiUrl}/${name.toLowerCase()}`);
      setCount(response.data.value);
    } catch (error) {
      console.error("Error updating count:", error);
    }
  }

  // Function to fetch the current click count using Axios
  async function fetchCount(name: string): Promise<void> {
    try {
      if (!name) {
        throw new Error("Name is undefined or empty");
      }
      const response = await axios.get(`${apiUrl}/${name.toLowerCase()}`);
      setCount(response.data.value);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }

  const getBackgroundImage = (name: string, isPressed: boolean) => {
    if (name === "Puun") {
      return isPressed
        ? 'bg-[url("/puun_open.jpg")]'
        : 'bg-[url("/puun_close.jpg")]';
    } else if (name === "Bow") {
      return isPressed
        ? 'bg-[url("/bow_open.jpg")]'
        : 'bg-[url("/bow_close.jpg")]';
    } else if (name === "Meen") {
      return isPressed
        ? 'bg-[url("/meen_open.jpg")]'
        : 'bg-[url("/meen_close.jpg")]';
    } else {
      return isPressed
        ? 'bg-[url("/bruce_open.jpg")]'
        : 'bg-[url("/bruce_close.jpg")]';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-purple-600 to-pink-500 p-4 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex items-center space-x-2 border border-white p-2 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-white font-semibold">{name} Pop</span>
            </button>

            <div className="backdrop-blur-sm bg-white/30 rounded-full px-4 py-2">
              <span className="text-white font-bold text-lg">
                Count: {count}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-[76px] w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md w-full">
            <button
              type="button"
              onClick={() => {
                setName("Puun");
                fetchCount("Puun");
              }}
              className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium w-full"
            >
              Puun Pop
            </button>
            <button
              type="button"
              onClick={() => {
                setName("Bow");
                fetchCount("Bow");
              }}
              className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium w-full"
            >
              Bow Pop
            </button>
            <button
              type="button"
              onClick={() => {
                setName("Meen");
                fetchCount("Meen");
              }}
              className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium w-full"
            >
              Meen Pop
            </button>
            <button
              type="button"
              onClick={() => {
                setName("Bruce");
                fetchCount("Bruce");
              }}
              className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium w-full"
            >
              Bruce Pop
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onMouseDown={async () => {
          updateCount(name);
          setIsPressed(true);
        }}
        onMouseUp={() => {
          setIsPressed(false);
        }}
        className={`${getBackgroundImage(
          name,
          isPressed
        )} bg-cover bg-center w-full h-full text-white p-2 rounded-lg`}
      />
    </div>
  );
}

export default App;
