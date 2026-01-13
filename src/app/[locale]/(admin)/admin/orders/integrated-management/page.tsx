"use client";

import React, { useState } from "react";
import CancellationListPage from "../cancellation/page";
import ExchangeListPage from "../exchange/page";
import ReturnListPage from "../return/page";
import RefundListPage from "../refund/page";

export default function IntegratedOrderManagementPage() {
  const [activeTab, setActiveTab] = useState("취소 리스트");
  const tabs = ["취소 리스트", "교환 리스트", "반품 리스트", "환불 리스트"];

  const renderContent = () => {
    switch (activeTab) {
      case "취소 리스트":
        return <CancellationListPage />;
      case "교환 리스트":
        return <ExchangeListPage />;
      case "반품 리스트":
        return <ReturnListPage />;
      case "환불 리스트":
        return <RefundListPage />;
      default:
        return <CancellationListPage />;
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-xs pb-24 relative">
        <div className="px-6 pt-6">
            <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200 pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-t-sm text-sm font-bold transition-colors ${
                            activeTab === tab
                            ? "bg-[#555555] text-white"
                            : "bg-white text-gray-500 hover:bg-gray-100 border border-transparent"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
      
      {/* Remove padding from child components since we handle it here or let them have their own padding but managed */}
      <div className="active-tab-content">
          {renderContent()}
      </div>
    </div>
  );
}
