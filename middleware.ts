export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/foods/new", "/foods/:id+/edit"],
};
