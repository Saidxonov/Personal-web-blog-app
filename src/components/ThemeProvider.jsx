import * as React from "react";
import * as Icons from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";

function themeProvider() {
  function setTheme(theme) {
    let newTheme = "";
    if (theme == "system") {
      newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      newTheme = theme;
    }
    localStorage.setItem("theme", newTheme);
    document.querySelector("html").setAttribute("class", newTheme);
  }

  return (
    <div className="flex items-center w-24">
      <Select
        onValueChange={(value) => {
          setTheme(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <Icons.SunIcon className="w-5 h-5" />
          </SelectItem>
          <SelectItem value="dark">
            <Icons.MoonIcon className="w-5 h-5" />
          </SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default themeProvider;
