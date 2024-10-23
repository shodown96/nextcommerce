import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PATHS } from "@/lib/constants/paths";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NavbarItem } from "./navbar-item";
import { UserMenuItem } from "./user-menu-item";
import { CartSummaryNav } from "./cart-summary-nav";

export const NavbarSignedOut = () => {
  return (
    <>
      <div className="flex items-center justify-between max-md:hidden">
        <NavbarItem
          className="w-[66px]" // Fix the shift on hover (font-weight)
          href={PATHS.LANDING}
          text="Home"
        />
        <NavbarItem
          className="w-[59px]" // Fix the shift on hover
          href={PATHS.ABOUT}
          text="About"
        />
        <NavbarItem
          className="w-[75px]" // Fix the shift on hover
          href={PATHS.CONTACT}
          text="Contact"
        />
        <NavbarItem
          href={PATHS.EXPLORE}
          text={`Explore`}
        />
      </div>
      <NavbarItem
        // type="button"
        // className="w-[196px] border !border-white"
        href={PATHS.SIGN_IN}
        className="max-md:hidden"
        text="Sign In"
      />
      <div className="max-md:hidden">
        <CartSummaryNav />
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className='[&[data-state="open"]>div>span#name]:underline outline-none'>
            <HamburgerMenuIcon className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[270px] rounded-[8px] p-0">
            <div className="mx-2 border-b" />
            <a href={PATHS.LANDING} className="md:hidden"><UserMenuItem text="Home" /></a>
            <a href={PATHS.EXPLORE} className="md:hidden"><UserMenuItem text="Explore" /></a>
            <a href={"#"} className="md:hidden"><CartSummaryNav /></a>
            <div className="mx-2 border-b" />
            <a href={PATHS.SIGN_IN}><UserMenuItem text="Sign in" /></a>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
