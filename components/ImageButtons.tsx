"use client";
import React from "react";

interface Props {
  onClick: () => void;
  component: React.ReactNode;
  classname?: string;
}

export default function ImageButtons({ onClick, component, classname }: Props) {
  return (
    <div className={`flex items-center justify-center ${classname}`}>
      <button
        className="rounded-2xl hover:scale-110 transition-all duration-300"
        onClick={onClick}
      >
        {component}
      </button>
    </div>
  );
}
