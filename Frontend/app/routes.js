import { index, route, layout } from "@react-router/dev/routes";

export default [
  // Main layout with Navbar and Footer
  layout("./layouts/MainLayout.jsx", [
    index("./pages/Home.jsx"),
    route("gigs", "./pages/Gigs.jsx"),
    route("mygigs", "./pages/MyGigs.jsx"),
    route("orders", "./pages/Orders.jsx"),
    route("messages", "./pages/Messages.jsx"),
    route("message/:id", "./pages/Message.jsx"),
    route("add", "./pages/Add.jsx"),
    route("gig/:id", "./pages/Gig.jsx"),
  ]),
  
  // Auth routes without main layout
  route("register", "./pages/Register.jsx"),
  route("login", "./pages/Login.jsx"),
  route("become-seller", "./pages/BecomeSeller.jsx"), // Fixed this line
];