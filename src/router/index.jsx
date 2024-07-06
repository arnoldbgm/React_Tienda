import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditPage, FormPage, NotFoundPage, ProductPage } from "../pages";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<FormPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
