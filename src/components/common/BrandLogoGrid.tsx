import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Brand {
    id: string;
    name: string;
    logoUrl: string | null;
    slug: string | null;
}

interface BrandLogoGridProps {
    brands: Brand[];
}

export default function BrandLogoGrid({ brands }: BrandLogoGridProps) {
    if (!brands || brands.length === 0) return null;

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
                <Link
                    key={brand.id}
                    href={brand.slug ? `/main/brand/${brand.slug}` : `/main/brand/${brand.id}`}
                    className="group flex items-center justify-center p-4 bg-white border border-gray-100 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 aspect-video relative overflow-hidden"
                >
                    {brand.logoUrl ? (
                        <div className="relative w-full h-full p-2 flex items-center justify-center">
                            <Image
                                src={brand.logoUrl}
                                alt={brand.name}
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                            />
                        </div>
                    ) : (
                        <span className="text-sm font-medium text-gray-800 text-center px-2 group-hover:text-primary transition-colors">
                            {brand.name}
                        </span>
                    )}
                </Link>
            ))}
        </div>
    );
}
