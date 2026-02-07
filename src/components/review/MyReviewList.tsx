"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductReviewDTO } from "@/actions/review-actions";

export default function MyReviewList({ reviews }: { reviews: ProductReviewDTO[] }) {
    if (reviews.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                작성한 리뷰가 없습니다.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="border border-gray-100 rounded-lg p-6 flex gap-6">
                    {/* Product Info */}
                    <Link href={`/product/${review.productId}`} className="shrink-0 w-24 block">
                        <div className="aspect-square relative bg-gray-100 rounded overflow-hidden mb-2">
                             {review.productImage ? (
                                <Image src={review.productImage} alt={review.productName || "Product"} fill className="object-cover" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                             )}
                        </div>
                        <p className="text-xs text-gray-500 truncate text-center">{review.productName}</p>
                    </Link>

                    {/* Review Content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-400 text-sm">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                                    ))}
                                </div>
                                <span className="font-bold text-sm">{review.rating}점</span>
                            </div>
                            <span className="text-xs text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        
                        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                            {review.comment}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
