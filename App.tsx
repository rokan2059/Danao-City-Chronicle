import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MarkdownViewer from './components/MarkdownViewer';
import { streamDanaoBlog } from './services/geminiService';
import { BlogPostState } from './types';

const App: React.FC = () => {
  const [blogState, setBlogState] = useState<BlogPostState>({
    content: '',
    isLoading: true,
    error: null,
  });
  
  const hasFetched = useRef(false);

  // Fetch content on mount
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    
    setBlogState(prev => ({ ...prev, isLoading: true, error: null }));

    streamDanaoBlog(
      (chunk) => {
        setBlogState(prev => ({ 
          ...prev, 
          content: prev.content + chunk 
        }));
      },
      () => {
        setBlogState(prev => ({ ...prev, isLoading: false }));
      },
      (error) => {
        setBlogState(prev => ({ ...prev, isLoading: false, error }));
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegenerate = () => {
    setBlogState({ content: '', isLoading: true, error: null });
    streamDanaoBlog(
      (chunk) => {
        setBlogState(prev => ({ 
          ...prev, 
          content: prev.content + chunk 
        }));
      },
      () => {
        setBlogState(prev => ({ ...prev, isLoading: false }));
      },
      (error) => {
        setBlogState(prev => ({ ...prev, isLoading: false, error }));
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <Hero />

      <main className="flex-grow container mx-auto px-4 py-12 relative -mt-10 md:-mt-20 z-20">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto min-h-[400px]">
          
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://picsum.photos/seed/author/50/50" 
                alt="Author" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-bold text-gray-900">Gemini AI</p>
                <p className="text-xs text-gray-500">Travel Writer • {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <button 
              onClick={handleRegenerate}
              disabled={blogState.isLoading}
              className={`text-sm px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                blogState.isLoading 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-transparent' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-danao-600'
              }`}
            >
              {blogState.isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Writing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  <span>Refresh Story</span>
                </>
              )}
            </button>
          </div>

          <div id="blog-content" className="min-h-[200px]">
             {blogState.error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                <p className="font-bold">Oops!</p>
                <p>{blogState.error}</p>
                <button 
                  onClick={handleRegenerate} 
                  className="mt-4 underline"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <MarkdownViewer content={blogState.content} />
                {blogState.content === '' && blogState.isLoading && (
                   <div className="space-y-4 animate-pulse">
                     <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                     <div className="h-4 bg-gray-200 rounded w-full"></div>
                     <div className="h-4 bg-gray-200 rounded w-full"></div>
                     <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                     <div className="h-64 bg-gray-100 rounded w-full mt-6"></div>
                   </div>
                )}
              </>
            )}
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               <img src="https://picsum.photos/seed/danao1/400/300" alt="Danao View 1" className="rounded-lg object-cover w-full h-48 hover:opacity-90 transition-opacity cursor-pointer" />
               <img src="https://picsum.photos/seed/danao2/400/300" alt="Danao View 2" className="rounded-lg object-cover w-full h-48 hover:opacity-90 transition-opacity cursor-pointer" />
               <img src="https://picsum.photos/seed/danao3/400/300" alt="Danao View 3" className="rounded-lg object-cover w-full h-48 hover:opacity-90 transition-opacity cursor-pointer" />
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 font-serif italic text-lg mb-6">"Live, Love, Danao"</p>
          <div className="flex justify-center gap-6 mb-8">
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-danao-100 hover:text-danao-600 transition-colors cursor-pointer">
              <span className="sr-only">Facebook</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </span>
             <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-danao-100 hover:text-danao-600 transition-colors cursor-pointer">
              <span className="sr-only">Twitter</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </span>
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Danao City Chronicles. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
