import { useEffect, useState, useRef } from "react";
import { getSkus } from "../../api/sku.api";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { ProductCard } from "../components/ecommerce/ProductCard";
import Trapezoid from "../components/ui/trapezoidshape";
import HeadphoneStack from "../components/ui/headphonegroup";
import BentoGrid from "../components/ui/bentogrid";
import RandomizeText from "../components/effect/randomizetext";
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
export function HomePage() {
  const [product, setProduct] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  const headphoneImages: [string, string, string] = [
    '/c.png',
    '/l.png',
    '/r.png',

  ];
  const images: string[] = [
    '/author1.png',
    '/author2.png',
    '/author3.png',
    '/author4.png',
    '/batterylogo.png',
    '/coastmasterlogo.png',
  ];
  useEffect(() => {
    async function load() {
      try {
        const products = await getSkus();
        const data = products.data.data ?? products.data;
        setProduct(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return (<div className="h-screen flex items-center justify-center font-pixels">
    <p className="animate-pulse">Loading Collection...</p>
  </div>);
  if (!product) return <p className="h-screen text-center mt-20">No product found</p>;

  return (
    <div className="font-pixels relative w-full h-screen overflow-hidden z-10">
      <Parallax pages={6} className="no-scrollbar"
        style={{ scrollSnapType: 'y mandatory' }}>

        {/* 1. Hero Section (SONY) */}
        <ParallaxLayer offset={0} speed={0.5} className="flex items-center justify-center" style={{ scrollSnapAlign: 'start' }}>
          <section className="h-screen flex items-center justify-center bg-white text-black">
            <div className="text-center">
              <h1 className="text-6xl opacity-0 d-none font-bold mb-4 animate-fade-in animate-zoom-out font-serif">SONY</h1>
              <p className="text-xl overflow-hidden whitespace-nowrap tracking-[0.3em] animate-typing delay-300">Elevate Your Sound</p>
            </div>
          </section>
        </ParallaxLayer>

        {/* 2. Product Visual (WH-1000 XM6 Image) */}
        <ParallaxLayer offset={1} speed={0.2}>
          <section className="justify-center items-center mx-auto flex relative h-full">
            <div className="relative w-screen h-screen">
              <img src="p3.png" alt="" className="absolute inset-0 w-full h-full object-contain z-0 -translate-y-[-36px]" />
              <div className="text-[70px] gap-[40px] font-bold absolute top-1/2 left-1/2 transform -translate-x-[255px] -translate-y-[-240px] z-10 flex">
                WH <p className="opacity-50 text-white text-[70px] tracking-[-4px]">1000</p> XM6
              </div>
            </div>
          </section>
        </ParallaxLayer>

        {/* 3. First Product Grid */}
        <ParallaxLayer offset={1.99} speed={0.4}>
          <section className="py-16 px-6 bg-gray-100 relative h-full">
            <Trapezoid width={160} height={40} topWidth={60} bottomWidth={80} color="none" className="bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 z-10 absolute top-1 left-1/2" />
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {product.slice(0, 4).map((item: any) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </section>
        </ParallaxLayer>

        {/* 4. Feature Description (Headphone Stack) */}
        <ParallaxLayer offset={2.5} speed={0.3}>
          <section className="py-16 px-6 bg-gray-200 relative h-full flex items-center">
            <Trapezoid width={160} height={40} topWidth={60} bottomWidth={80} color="none" className="bg-gray-200 transform -translate-x-1/2 -translate-y-1/2 z-10 absolute top-1 left-1/2" />
            <div className="justify-content-center flex items-center w-full">
              <div className="align-items-center max-w-7xl mx-auto ">
                <h2 className="text-[40px] font-bold text-left flex">WH-<p className="text-orange-600">1000</p>XM6 SERIES</h2>
                <div className="w-150"><RandomizeText text="Powered by advanced processors and an adaptive microphone system..." /></div>
                <div className="flex justify-left mt-8">
                <Link to="/series">
                  <Button variant= "orange" className="px-6 py-3 text-white rounded-full">
                    See More
                  </Button>
                </Link>
              </div>
              </div>
              <HeadphoneStack images={headphoneImages} />
            </div>
          </section>
        </ParallaxLayer>

        {/* 5. Mastering Audio Engineers (Bento Grid) */}
        <ParallaxLayer offset={3} speed={0.5} factor={1.2}>
          <section className="py-16 bg-gray-300 relative h-full">
            <Trapezoid width={160} height={40} topWidth={60} bottomWidth={80} color="none" className="bg-gray-300 transform -translate-x-1/2 -translate-y-1/2 z-10 absolute top-1 left-1/2" />
            <div className="justify-content-center flex flex-col items-center">
              <div className="align-items-center max-w-7xl mx-auto pb-[100px]">
                <h2 className="text-[40px] font-bold text-center flex">CO-CREATED WITH MASTERING AUDIO ENGINEERS</h2>
                <p className="w-200 text-center mx-auto">Developed in collaboration with world-renowned mastering audio engineers...</p>
              </div>
              <BentoGrid images={images} />
            </div>
          </section>
        </ParallaxLayer>

        {/* 6. Ultra-Clear Calls Section */}
        <ParallaxLayer offset={4.7} speed={0.2}>
          <section className="py-16 px-6 bg-gray-400 relative h-full flex items-center">
            <Trapezoid width={160} height={40} topWidth={60} bottomWidth={80} color="none" className="bg-gray-400 transform -translate-x-1/2 -translate-y-1/2 z-10 absolute top-1 left-1/2" />
            <div className="justify-between flex items-center w-full max-w-7xl mx-auto">
              <div>
                <h2 className="text-[20px] text-left animate-fade-in">ULTRA-CLEAR CALLS</h2>
                <h2 className="text-[40px] font-bold text-left animate-fade-in">FROM ANYWHERE</h2>
                <div className="w-150"><RandomizeText text="A six-microphone AI-based beamforming system..." /></div>
                <div className="flex justify-left mt-8">
                <Link to="/series">
                  <Button variant= "orange" className="px-6 py-3 text-white rounded-full">
                    See More
                  </Button>
                </Link>
              </div>
              </div>
              <img src="c.png" alt="" className="w-120 h-full object-contain z-20 transition-transform duration-500 active:scale-110 animate-pulse" />
            </div>
          </section>
        </ParallaxLayer>

        {/* 7. Final Product Grid */}
        <ParallaxLayer offset={5.3} speed={0.4}>
          <section className="py-16 px-6 bg-gray-100 relative h-full">
            <Trapezoid width={160} height={40} topWidth={60} bottomWidth={80} color="none" className="bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 z-10 absolute top-1 left-1/2" />
            <div className="max-w-7xl mx-auto ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {product.slice(0, 4).map((item: any) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Link to="/series">
                  <Button variant= "orange" className="px-6 py-3 text-white rounded-full" >
                    See More
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </ParallaxLayer>

      </Parallax>
    </div>
  );
}