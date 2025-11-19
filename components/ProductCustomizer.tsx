import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductPreview from './ProductPreview';
import { useCart } from '../store/CartContext';
import { generateWifiPasswords } from '../services/geminiService';
import { GenerationStatus } from '../types';

const ProductCustomizer = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'manual' | 'ai'>('manual');
  const [businessType, setBusinessType] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState('');
  
  // Track metadata for the current password
  const [passwordMeta, setPasswordMeta] = useState<{ isAI: boolean; context?: string }>({ 
    isAI: false 
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (aiSuggestions.length > 0) {
      scrollToBottom();
    }
  }, [aiSuggestions]);

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // If user types, it's no longer purely AI generated (or at least they edited it)
    setPasswordMeta({ isAI: false });
    
    // Basic constraint for visual sanity, though physical plate can hold more
    if (e.target.value.length > 32) {
        setPassword(e.target.value.substring(0, 32));
    }
  };

  const handleGenerate = async () => {
    if (!businessType.trim()) {
      setError('Please describe your business type.');
      return;
    }

    setStatus(GenerationStatus.LOADING);
    setError('');
    setAiSuggestions([]);
    
    try {
      const suggestions = await generateWifiPasswords(businessType);
      setAiSuggestions(suggestions);
      setStatus(GenerationStatus.SUCCESS);
    } catch (e) {
      setError('Failed to generate passwords. Please try again.');
      setStatus(GenerationStatus.ERROR);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setPassword(suggestion);
    setPasswordMeta({ isAI: true, context: businessType });
    // Switch to manual mode implicitly to allow editing, but keep AI meta unless they type
    setMode('manual'); 
  };

  const handleAddToCart = () => {
    if (!password) return;
    addToCart(password, passwordMeta.isAI, passwordMeta.context);
    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Design Your Sign</h1>
        <p className="text-slate-500 text-lg">Create a beautiful WiFi password display for your space.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Preview */}
        <div className="lg:sticky lg:top-8 order-2 lg:order-1">
            <ProductPreview password={password} loading={status === GenerationStatus.LOADING} />
            
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500">Price</span>
                    <span className="text-2xl font-bold text-slate-900">$29.99</span>
                </div>
                 <div className="flex flex-col gap-3">
                    <div className="text-sm text-slate-500 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Includes mounting kit
                    </div>
                    <div className="text-sm text-slate-500 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Free shipping worldwide
                    </div>
                </div>
                <button 
                    onClick={handleAddToCart}
                    disabled={!password}
                    className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-[0.98]
                        ${password 
                            ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-200' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                    `}
                >
                    {password ? 'Add to Cart' : 'Enter a Password'}
                </button>
            </div>
        </div>

        {/* Right Column: Controls */}
        <div className="order-1 lg:order-2 space-y-8">
            {/* Mode Toggle */}
            <div className="bg-slate-100 p-1.5 rounded-xl inline-flex w-full">
                <button 
                    onClick={() => setMode('manual')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'manual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Create my own
                </button>
                <button 
                    onClick={() => setMode('ai')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'ai' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    ✨ AI Generate
                </button>
            </div>

            {mode === 'manual' ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <label className="block text-sm font-medium text-slate-700">
                        Your Password
                    </label>
                    <input
                        type="text"
                        value={password}
                        onChange={handleManualChange}
                        placeholder="Type your password here..."
                        className="w-full px-5 py-4 text-lg rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all placeholder:text-slate-300"
                    />
                    <p className="text-xs text-slate-400">
                        Characters: {password.length} / 32
                    </p>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Describe your business or space
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                placeholder="e.g. Cozy Cat Café, Modern Gym, Beach House..."
                                className="w-full px-5 py-4 text-lg rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                            />
                            <button 
                                onClick={handleGenerate}
                                disabled={status === GenerationStatus.LOADING || !businessType}
                                className="absolute right-2 top-2 bottom-2 px-4 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-200 text-white rounded-lg font-medium transition-colors"
                            >
                                {status === GenerationStatus.LOADING ? 'Thinking...' : 'Generate'}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                     </div>

                     {/* Suggestions Area */}
                     {(status === GenerationStatus.SUCCESS || aiSuggestions.length > 0) && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Suggestions</h3>
                            <div className="grid gap-3">
                                {aiSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => selectSuggestion(suggestion)}
                                        className="group text-left p-4 rounded-xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50 transition-all duration-200 flex justify-between items-center"
                                    >
                                        <span className="font-mono text-slate-700 group-hover:text-sky-700 font-medium">{suggestion}</span>
                                        <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-400 group-hover:text-sky-500 group-hover:border-sky-200">Select</span>
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={handleGenerate}
                                className="text-sm text-slate-500 hover:text-sky-600 underline underline-offset-4"
                            >
                                Generate more options
                            </button>
                        </div>
                     )}
                     <div ref={messagesEndRef} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;