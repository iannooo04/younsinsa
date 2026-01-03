"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Layers } from "lucide-react";

interface OptionValue {
    name: string;
}

interface OptionTemplate {
    id: string;
    name: string;
    options: {
        name: string;
        values: OptionValue[];
    }[];
}

export default function OptionTemplateManager() {
    const [templates, setTemplates] = useState<OptionTemplate[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Editor State
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState("");
    const [currentOptions, setCurrentOptions] = useState<{name: string, values: OptionValue[]}[]>([
        { name: "", values: [] }
    ]);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/option-templates");
            if (res.ok) {
                const data = await res.json();
                setTemplates(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // --- Option Editor Logic (Copied/Adapted from ProductForm) ---
    const handleAddOption = () => {
        setCurrentOptions([...currentOptions, { name: "", values: [] }]);
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = [...currentOptions];
        newOptions.splice(index, 1);
        setCurrentOptions(newOptions);
    };

    const handleOptionNameChange = (index: number, name: string) => {
        const newOptions = [...currentOptions];
        newOptions[index].name = name;
        setCurrentOptions(newOptions);
    };

    const handleAddValue = (optionIndex: number) => {
        const newOptions = [...currentOptions];
        newOptions[optionIndex].values.push({ name: "" });
        setCurrentOptions(newOptions);
    };

    const handleRemoveValue = (optionIndex: number, valueIndex: number) => {
        const newOptions = [...currentOptions];
        newOptions[optionIndex].values.splice(valueIndex, 1);
        setCurrentOptions(newOptions);
    };

    const handleValueNameChange = (optionIndex: number, valueIndex: number, name: string) => {
        const newOptions = [...currentOptions];
        newOptions[optionIndex].values[valueIndex].name = name;
        setCurrentOptions(newOptions);
    };
    // ------------------------------------------------------------

    const handleSave = async () => {
        if (!currentName) return alert("Please enter a template name");
        
        try {
            // Note: Currently API only supports Create (POST) and Delete (DELETE). 
            // For Edit, we might need PUT, but simplest MVP is Create New.
            // If editingId exists, we ideally update. For now, let's just support Create/Delete logic cleanly.
            
            const res = await fetch("/api/admin/option-templates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: currentName, options: currentOptions }),
            });

            if (res.ok) {
                alert("Template saved successfully!");
                setIsEditing(false);
                fetchTemplates();
                resetForm();
            } else {
                alert("Failed to save template");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving template");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this strategy?")) return;
        try {
            const res = await fetch(`/api/admin/option-templates?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchTemplates();
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
             console.error(error);
        }
    };

    const resetForm = () => {
        setCurrentName("");
        setCurrentOptions([{ name: "", values: [] }]);
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Layers className="text-primary" /> Option Strategies
                </h1>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        resetForm();
                        setIsEditing(true);
                    }}
                >
                    <Plus size={18} /> New Strategy
                </button>
            </div>

            {isEditing && (
                <div className="card bg-base-100 shadow-lg border border-primary/20">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Create New Strategy</h2>
                        
                        <div className="form-control w-full mb-4">
                            <label className="label"><span className="label-text">Strategy Name</span></label>
                            <input 
                                type="text" 
                                className="input input-bordered w-full" 
                                placeholder="e.g. Standard T-Shirt Sizes"
                                value={currentName}
                                onChange={(e) => setCurrentName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-4 border rounded-xl p-4 bg-base-50">
                            {currentOptions.map((option, optIdx) => (
                                <div key={optIdx} className="card bg-white border border-gray-200 p-4 shadow-sm">
                                    <div className="flex justify-between items-center mb-3">
                                        <input 
                                            type="text" 
                                            placeholder="Option Name (e.g. Size)" 
                                            className="input input-sm input-bordered font-bold w-1/2"
                                            value={option.name}
                                            onChange={(e) => handleOptionNameChange(optIdx, e.target.value)}
                                        />
                                        <button type="button" className="btn btn-ghost btn-sm text-error" onClick={() => handleRemoveOption(optIdx)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {option.values.map((val, valIdx) => (
                                            <div key={valIdx} className="badge badge-lg gap-2 pl-0 pr-1 py-4 h-auto bg-base-100 border-base-300">
                                                <input 
                                                    type="text" 
                                                    className="input input-ghost input-xs focus:outline-none w-20 text-center"
                                                    placeholder="Value"
                                                    value={val.name}
                                                    onChange={(e) => handleValueNameChange(optIdx, valIdx, e.target.value)}
                                                />
                                                <button type="button" onClick={() => handleRemoveValue(optIdx, valIdx)} className="btn btn-circle btn-ghost btn-xs text-base-content/50 hover:text-error">×</button>
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-xs btn-outline border-dashed" onClick={() => handleAddValue(optIdx)}>+ Value</button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-outline btn-block border-dashed" onClick={handleAddOption}>
                                <Plus size={16} /> Add Option Group
                            </button>
                        </div>

                        <div className="card-actions justify-end mt-6">
                            <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>
                                <Save size={18} /> Save Strategy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(template => (
                    <div key={template.id} className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow">
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <h3 className="card-title text-lg">{template.name}</h3>
                                <button className="btn btn-square btn-ghost btn-sm text-base-content/50 hover:text-error" onClick={() => handleDelete(template.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="space-y-2 mt-4">
                                {template.options.map((opt, idx) => (
                                    <div key={idx} className="text-sm">
                                        <span className="font-bold mr-2">{opt.name}:</span>
                                        <span className="text-base-content/70">
                                            {opt.values.map(v => v.name).join(", ")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
