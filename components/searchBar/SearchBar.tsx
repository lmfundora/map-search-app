"use client";
import React, { useEffect, useState } from "react";
import { LoaderCircle, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "@/components/ui/progress";

type Props = {
  className?: string;
  action: (query: string) => void;
  onClose?: () => void;
  placeholder?: string;
  loading?: boolean;
};

const SearchBar = ({
  className,
  action,
  onClose,
  placeholder,
  loading = false,
}: Props) => {
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;
    setQuery(q);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        q !== "" && action(q);
      }, 700),
    );
  };

  const close = () => {
    setQuery("");
    onClose && onClose();
  };

  return (
    <>
      <div className={` ${className} rounded-lg`}>
        <div
          className={`flex align-middle gap-1 justify-center items-center rounded-lg ps-2 focus-within:ring-2 ring-primary/30 ring-offset-2`}
        >
          {loading ? (
            <LoaderCircle color="gray" className="animate-spin" />
          ) : (
            <Search color="gray" />
          )}
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
                onClick={close}
              >
                <X color="red" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
