import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { ThemeSwitch } from "@/config/theme-switch";
import { User, Divider, Badge, Input, Button } from "@heroui/react";
import { Bell, Mail, Search, Sheet, MapPinned } from 'lucide-react';
import { useState } from "react";
export const NavbarTop = () => {

  const [isInvisible, setIsInvisible] = useState(false);

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      className="mt-4 px-0 rounded-2xl [&>header]:px-4 p-2 dark:bg-content2 bg-content1"
    >
      <div className="flex flex-1 justify-between items-center ">
        <NavbarContent className="sm:basis-full px-0" justify="start">
          <h2>Marketstock</h2>
          <div className="hidden sm:flex w-[300px] max-w-xs ml-4">
            <Input
              labelPlacement="outside"
              placeholder="Recherche..."
              variant="bordered"
              startContent={
                <Search size={20} />
              }
              type="text"
            />
          </div>
        </NavbarContent>

        <NavbarContent
          className="sm:flex basis-1/5 sm:basis-full flex h-5 items-center space-x-4 text-small"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2 items-center">
            <MapPinned size={20} />
            <Divider className="h-12 mx-2" orientation="vertical" />
            <Sheet size={20} />
            <Divider className="h-12 mx-2" orientation="vertical" />
            <Badge color="primary" content={3} isInvisible={isInvisible} size="sm" showOutline={false}>
              <Mail size={20} />
            </Badge>
            <Divider className="h-12 mx-2" orientation="vertical" />
            <Badge color="danger" content={5} isInvisible={isInvisible} size="sm" showOutline={false}>
              <Bell size={20} />
            </Badge>
            <Divider className="h-12 mx-2" orientation="vertical" />
            <ThemeSwitch />
            <Divider className="h-12 mx-2" orientation="vertical" />
            <UserMenu />
          </NavbarItem>

        </NavbarContent>
      </div>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
         /* Mobile menu items */
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};





const UserMenu = () => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger
        >
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Product Designer"
            name="Jane Doe"
          />

        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}