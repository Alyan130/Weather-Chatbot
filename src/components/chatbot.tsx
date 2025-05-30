"use client";

import { useChat } from "@ai-sdk/react";
import React from "react";
import { FaPaperPlane, FaRobot, FaUser, FaCloud } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";
import Weather from "@/components/weather"

function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="flex flex-col h-screen max-w-5xl mx-auto">
     
        <header className="border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <TiWeatherCloudy size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-100">Weather Assistant</h1>
                <p className="text-sm text-gray-400">Real-time weather information</p>
              </div>
            </div>
          </div>
        </header>

      
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
           
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="max-w-4xl mx-auto space-y-6">
                
                {messages.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FaCloud size={32} className="text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-medium text-gray-100 mb-3">Welcome to Weather Assistant</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Get instant weather updates for any location worldwide. Just ask me about the weather!
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["London weather", "Tokyo forecast", "New York temperature"].map((suggestion) => (
                        <button
                          key={suggestion}
                          className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 
                                   rounded-lg text-sm text-gray-300 transition-all duration-200 hover:border-gray-600/50"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <FaRobot size={14} className="text-white" />
                      </div>
                    )}

                    <div className={`max-w-2xl ${message.role === "user" ? "order-first" : ""}`}>
                      {message.content && (
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-800/60 border border-gray-700/50 text-gray-100"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                      )}

                  
                      {message.toolInvocations?.map(tool => {
                        const { state, toolCallId, toolName } = tool;
                        
                        if (state === "result" && toolName === "getWeather") {
                          const { result } = tool;
                          return (
                            <div key={toolCallId} className="mt-3">
                              <Weather {...result} />
                            </div>
                          );
                        }
                        
                        if (state === "call") {
                          return (
                            <div key={toolCallId} className="mt-3">
                              <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                  <span className="text-sm text-gray-300">
                                    Fetching weather data...
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        
                        return null;
                      })}
                    </div>

                    {message.role === "user" && (
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <FaUser size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}

          
                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <FaRobot size={14} className="text-white" />
                    </div>
                    <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        </div>
                        <span className="text-sm text-gray-300">Analyzing your request...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-800/50 bg-gray-900/30 backdrop-blur-xl">
              <div className="px-6 py-4">
                <div className="max-w-4xl mx-auto">
                  <form onSubmit={handleSubmit} className="flex gap-4">
                    <div className="flex-1 relative">
                      <input
                        className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl 
                                 text-gray-100 placeholder-gray-400 text-base
                                 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                 transition-all duration-200 backdrop-blur-sm"
                        value={input}
                        placeholder="Ask about weather in any city..."
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 
                               disabled:cursor-not-allowed text-white rounded-2xl
                               transition-all duration-200 flex items-center justify-center
                               focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <FaPaperPlane size={16} />
                      )}
                    </button>
                  </form>
                  
                  {/* Footer */}
                  <div className="text-center mt-3">
                    <p className="text-xs text-gray-500">
                      Powered by WeatherAPI • Real-time weather data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;