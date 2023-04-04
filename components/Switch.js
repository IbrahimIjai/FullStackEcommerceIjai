import { BsMoonStars, BsSun } from "react-icons/bs";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

const RenderThemeChanger = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="text-blue-600">
      {currentTheme === "dark" ? (
        <BsSun
          // className="w-6 h-6 text-green-100"
          role="button"
          onClick={() => setTheme("light")}
        />
      ) : (
        <BsMoonStars
          // className="w-6 h-6 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
};

export default RenderThemeChanger;
