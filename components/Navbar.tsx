import React from "react";
import Container from "@/components/ui/Container";
import Link from "next/link";
import MainNav from "@/components/ui/MainNav";

import getCategories from "@/actions/getCategories";
import NavbarActions from "./ui/NavbarActions";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div>
      <Container>
        <div className="relative px-4 md:px-6 lg:px-8 flex items-center h-16">
          <Link href={"/"} className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
