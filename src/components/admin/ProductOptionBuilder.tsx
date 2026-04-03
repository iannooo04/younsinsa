"use client";

import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

export type OptionType = {
    name: string;
    values: string[];
};

export type VariantType = {
    optionValues: Record<string, string>;
    price: number;
    stock: number;
};

interface Props {
    onChange: (data: { options: OptionType[]; variants: VariantType[] }) => void;
    initialData?: { options: OptionType[]; variants: VariantType[] };
}

export default function ProductOptionBuilder({ onChange, initialData }: Props) {
    const [options, setOptions] = useState<OptionType[]>(initialData?.options?.length ? initialData.options : [
        { name: "컬러", values: [] },
        { name: "사이즈", values: [] }
    ]);
    const [inputValues, setInputValues] = useState<string[]>(initialData?.options?.length ? initialData.options.map(o => o.values.join(", ")) : ["", ""]);
    const [variants, setVariants] = useState<VariantType[]>(initialData?.variants?.length ? initialData.variants : []);

    useEffect(() => {
        onChange({ options, variants });
    }, [options, variants, onChange]);

    const handleOptionValuesChange = (index: number, valueStr: string) => {
        const newInputs = [...inputValues];
        newInputs[index] = valueStr;
        setInputValues(newInputs);

        const newOptions = [...options];
        newOptions[index].values = valueStr.split(",").map(s => s.trim()).filter(Boolean);
        setOptions(newOptions);
    };

    const generateVariants = () => {
        const activeOptions = options.filter(o => o.name && o.values.length > 0);
        if (activeOptions.length === 0) {
            setVariants([]);
            return;
        }

        let combos: Record<string, string>[] = [{}];
        for (const opt of activeOptions) {
            const nextCombos: Record<string, string>[] = [];
            for (const combo of combos) {
                for (const val of opt.values) {
                    nextCombos.push({ ...combo, [opt.name]: val });
                }
            }
            combos = nextCombos;
        }

        const newVariants = combos.map(combo => {
            const existing = variants.find(v => {
                let match = true;
                for (const k in combo) {
                    if (v.optionValues[k] !== combo[k]) match = false;
                }
                return match;
            });
            return {
                optionValues: combo,
                price: existing?.price || 0,
                stock: existing?.stock || 0
            };
        });
        setVariants(newVariants);
    };

    const updateVariantField = (idx: number, field: "price" | "stock", val: number) => {
        const newV = [...variants];
        newV[idx][field] = val;
        setVariants(newV);
    };

    // UI rendering
    return (
        <div className="w-full space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((opt, i) => (
                    <div key={i} className="border border-gray-200 p-4 bg-gray-50 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm">{opt.name}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">콤마(,)로 구분하여 여러 개를 입력하세요.</p>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-black"
                            placeholder={opt.name === '사이즈' ? "예: S, M, L" : "예: 레드, 블루, 블랙"} 
                            value={inputValues[i]}
                            onChange={(e) => handleOptionValuesChange(i, e.target.value)}
                        />
                        <div className="flex flex-wrap gap-1 mt-2">
                            {opt.values.map((v, vidx) => (
                                <span key={vidx} className="bg-white border text-xs px-2 py-1 rounded-sm">{v}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <button 
                    type="button" 
                    onClick={generateVariants}
                    className="flex items-center gap-1 bg-black text-white px-4 py-2 text-sm font-bold rounded-sm hover:bg-gray-800 transition-colors"
                >
                    <RotateCcw size={14} /> 품목(조합) 목록 생성 및 갱신
                </button>
                <span className="text-xs text-gray-500">옵션을 입력/수정한 후 버튼을 눌러 하단 조합 표를 생성하세요.</span>
            </div>

            {variants.length > 0 && (
                <div className="mt-4 border border-gray-200 rounded-md overflow-hidden bg-white">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 border-b border-gray-200 text-gray-700">
                            <tr>
                                {options.filter(o => o.values.length > 0).map((o, i) => (
                                    <th key={i} className="px-4 py-2 font-bold">{o.name}</th>
                                ))}
                                <th className="px-4 py-2 font-bold w-[150px]">추가 금액(원)</th>
                                <th className="px-4 py-2 font-bold w-[120px]">재고 수량(개)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {variants.map((v, i) => (
                                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                     {options.filter(o => o.values.length > 0).map((o, idx) => (
                                        <td key={idx} className="px-4 py-2 text-gray-800">{v.optionValues[o.name]}</td>
                                    ))}
                                    <td className="px-4 py-2">
                                        <input 
                                            type="number" 
                                            className="w-full border border-gray-300 px-2 py-1 text-sm rounded-sm focus:outline-none focus:border-black"
                                            value={v.price}
                                            onChange={(e) => updateVariantField(i, "price", parseInt(e.target.value) || 0)}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input 
                                            type="number" 
                                            className="w-full border border-gray-300 px-2 py-1 text-sm rounded-sm focus:outline-none focus:border-black"
                                            value={v.stock}
                                            onChange={(e) => updateVariantField(i, "stock", parseInt(e.target.value) || 0)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
