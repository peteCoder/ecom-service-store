import { Billboard as BillboardType } from "@/types";
import React from "react";

interface BillboardProps {
  data: BillboardType;
}

const Billboard = ({ data }: BillboardProps) => {
  return (
    <div className="p-4 sm:p6 lg:p-0 overflow-hidden rounded-xl">
      <div
        style={{ backgroundImage: `url(${data.imageUrl})` }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center items-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-center">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
