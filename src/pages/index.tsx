import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Skelton from "../components/Skelton";

const Home: NextPage = () => {
  const getAllCategories = async () => {
    // Fetching the data from the categories Api
    try {
      const respJSON = await fetch("/api/categories");
      const resp = await respJSON.json();
      return resp;
    } catch (error) {
      throw error;
    }
  };

  // Cache the data with AllCategoriesWithProducts key
  const { isLoading, data } = useQuery(
    ["AllCategoriesWithProducts"],
    getAllCategories
  );

  const categories = data?.categories;

  return (
    <div>
      <Head>
        <title>All Products</title>
        <meta name="description" content="All Products" />
        <link rel="icon" href="/favico.ico" />
      </Head>

      <main className="container mx-auto">
        <Navbar />
        {isLoading ? (
          <Skelton />
        ) : (
          <>
            {categories && categories.length > 0 && (
              <ProductGrid showLink={true} categories={categories} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
