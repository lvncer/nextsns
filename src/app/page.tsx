"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, Camera, Globe2 } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layouts/footer/Footer";

function RootPage() {
  const techStack = [
    {
      category: "フロントエンド",
      technologies: "React, Next.js, TypeScript, Tailwind CSS, Shadcn",
    },
    { category: "バックエンド", technologies: "Node.js, Express" },
    { category: "データベース", technologies: "MongoDB" },
    { category: "認証", technologies: "Cookie.js, Redux" },
    { category: "インフラ", technologies: "Vercel" },
    { category: "テスト", technologies: "Vitest, Jest" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const tableRowVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >
              つながりを、もっと深く
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8"
            >
              新しい出会いと体験を。あなたの日常をシェアしよう。
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Link href={"/home"}>無料で始める</Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                <Link href={"https://github.com/lvncer/nextsns"}>
                  詳細を見る
                </Link>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-4 gap-8 max-w-3xl mx-auto mb-16"
          >
            {[
              { icon: Users, text: "フレンド機能" },
              { icon: MessageCircle, text: "メッセージ" },
              { icon: Camera, text: "写真共有" },
              { icon: Globe2, text: "グローバル" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-full inline-block mb-2 shadow-md"
                >
                  <item.icon className="w-6 h-6 text-blue-600" />
                </motion.div>
                <p className="text-sm text-gray-600 font-medium">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-90"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
              <h2 className="text-xl font-semibold text-white">技術スタック</h2>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      カテゴリー
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      使用技術
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {techStack.map((item, index) => (
                    <motion.tr
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={tableRowVariants}
                      className="border-b border-gray-100"
                    >
                      <td className="py-3 px-4 text-gray-800 font-medium">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {item.technologies}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default RootPage;
