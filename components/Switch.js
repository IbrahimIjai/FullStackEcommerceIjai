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
    <div className="text-blue-600 dark:text-blue-100">
      {currentTheme === "dark" ? (
        <BsSun
          size={30}
          role="button"
          onClick={() => setTheme("light")}
        />
      ) : (
        <BsMoonStars
          size={30}
          role="button"
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
};

export default RenderThemeChanger;
