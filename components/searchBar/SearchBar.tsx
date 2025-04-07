"use client";
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  className?: string;
  action: (query: string) => void;
  placeholder?: string;
};

const SearchBar = ({ className, action, placeholder }: Props) => {
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;
    setQuery(q);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        q !== "" && action(q);
      }, 500),
    );
  };

  return (
    <div
      className={`flex align-middle gap-1 justify-center items-center rounded-lg ps-2 focus-within:ring-2 ring-primary/30 ring-offset-2 ${className}`}
    >
      <Search color="gray" />
      <div className="w-full relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="border-0 outline-none focus:outline-none ring-0 focus:ring-0 w-full h-9"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 cursor-pointer"
            onClick={() => setQuery("")}
          >
            <X color="red" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
