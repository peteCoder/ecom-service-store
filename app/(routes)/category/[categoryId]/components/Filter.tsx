"use client";

import { Size, Color } from "@/types";
import { useSearchParams } from "next/navigation";
import qs from "query-string";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { cn } from "@/libs/utils";

interface FilterProps {
  valueKey: string;
  name: string;
  data: (Size | Color)[];
}

const Filter: React.FC<FilterProps> = ({ valueKey, name, data }) => {
  const searchParams = useSearchParams();

  // console.log(searchParams.get("search"));

  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    // console.log(current);

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url, { scroll: false });
  };

  return (
    <div className="mb-8">
      <h3 className="tetx-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="">
            <Button
              onClick={() => onClick(filter.id)}
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
