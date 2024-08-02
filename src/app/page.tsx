"use client";
import api from "@/api/api.interceptor";
import { Product } from "@/types/models/product.type";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    api.get("/products").then((response) => {
      setProducts(response.data);
    });
  });
  return (
    <main className="">
      {products.map((product: Product) => {
        return (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
        );
      })}
    </main>
  );
}
