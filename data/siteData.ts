import { v4 as uuidv4 } from "uuid";

export const navItems = {
  logo: "Ha Foods",
  navLinks: [
    { id: uuidv4(), title: "Dashboard", href: "/dashboard" },
    { id: uuidv4(), title: "Foods", href: "/foods" },
  ],
};
