"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";

type Props = {
  className?: string;
  action?: (query: string) => void;
  placeholder?: string;
};

const SearchBar = ({ className, action, placeholder }: Props) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    console.log(query);
  };

  return (
    <Input
      type="text"
      className={`${className}`}
      value={query}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
