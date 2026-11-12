import React, { useState } from "react";
import { FileCode, Play, Terminal } from "lucide-react";

export const CodeEditorWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("safenest");

  const files: Record<string, { name: string; lang: string; code: string }> = {
    safenest: {
      name: "safenest_mesh.c",
      lang: "C (ESP-IDF / FreeRTOS)",
      code: `/*
 * SafeNest Emergency Mesh Routing Daemon
 * ESP32-S3 + Semtech SX1262 LoRa Multi-Hop
 * Author: Harish Maduraimani
 */

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "esp_log.h"
#include "sx1262_driver.h"

#define TAG "SAFENEST_CORE"
#define MESH_MAX_HOPS 8

typedef struct {
    uint32_t packet_id;
    uint16_t sender_node_id;
    uint16_t target_node_id;
    uint8_t  hop_count;
    float    latitude;
    float    longitude;
    char     sos_payload[64];
    uint32_t crc32;
} __attribute__((packed)) safenest_packet_t;

void vLoRaPacketForwardTask(void *pvParameters) {
    safenest_packet_t rx_pkt;
    ESP_LOGI(TAG, "SafeNest Ad-Hoc Flooding Mesh initialized on 868.1 MHz");

    while (1) {
        if (sx1262_receive_packet((uint8_t*)&rx_pkt, sizeof(rx_pkt), portMAX_DELAY)) {
            if (rx_pkt.hop_count < MESH_MAX_HOPS) {
                rx_pkt.hop_count++;
                ESP_LOGW(TAG, "Relaying SOS from Node 0x%04X (Hop %d)", 
                         rx_pkt.sender_node_id, rx_pkt.hop_count);
                
                vTaskDelay(pdMS_TO_TICKS(rand() % 50)); // Jitter to prevent collisions
                sx1262_transmit_packet((uint8_t*)&rx_pkt, sizeof(rx_pkt));
            }
        }
    }
}`,
    },
    robocore: {
      name: "robocore_ekf_nav.cpp",
      lang: "C++ (ROS 2 Humble)",
      code: `/*
 * RoboCore Autonomous Mobile Robot - EKF Odometry & LiDAR Fusion
 * Platform: ROS 2 Humble & STM32 CAN Bus Bridge
 * Author: Harish Maduraimani
 */

#include <rclcpp/rclcpp.hpp>
#include <nav_msgs/msg/odometry.hpp>
#include <sensor_msgs/msg/laser_scan.hpp>
#include <geometry_msgs/msg/twist.hpp>

class RoboCoreNavigator : public rclcpp::Node {
public:
    RoboCoreNavigator() : Node("robocore_navigator") {
        scan_sub_ = this->create_subscription<sensor_msgs::msg::LaserScan>(
            "/scan", 10, std::bind(&RoboCoreNavigator::laserCallback, this, std::placeholders::_1));
        
        cmd_pub_ = this->create_publisher<geometry_msgs::msg::Twist>("/cmd_vel", 10);
        RCLCPP_INFO(this->get_logger(), "RoboCore EKF SLAM active. Tracking obstacle vectors.");
    }

private:
    void laserCallback(const sensor_msgs::msg::LaserScan::SharedPtr scan) {
        float min_dist = 100.0f;
        for (auto range : scan->ranges) {
            if (range > scan->range_min && range < min_dist) {
                min_dist = range;
            }
        }
        
        auto cmd = geometry_msgs::msg::Twist();
        if (min_dist < 0.45f) {
            cmd.linear.x = 0.0;
            cmd.angular.z = 0.65; // Obstacle avoidance rotation
        } else {
            cmd.linear.x = 0.4;
            cmd.angular.z = 0.0;
        }
        cmd_pub_->publish(cmd);
    }

    rclcpp::Subscription<sensor_msgs::msg::LaserScan>::SharedPtr scan_sub_;
    rclcpp::Publisher<geometry_msgs::msg::Twist>::SharedPtr cmd_pub_;
};`,
    },
    finora: {
      name: "financial_rag.py",
      lang: "Python 3.11 (FastAPI & OCR)",
      code: `# Finora Financial Statement Parser & Fraud Anomaly Detector
# Author: Harish Maduraimani

import re
from typing import List, Dict
import numpy as np

class FinoraStatementAuditor:
    def __init__(self, raw_ocr_tokens: List[Dict]):
        self.tokens = raw_ocr_tokens
        self.anomaly_flags = []

    def compute_cashflow_velocity(self, transactions: List[Dict]) -> float:
        credits = sum(t['amount'] for t in transactions if t['type'] == 'CR')
        debits = sum(t['amount'] for t in transactions if t['type'] == 'DR')
        net_flow = credits - debits
        
        if credits > 0 and debits / credits > 0.96:
            self.anomaly_flags.append("HIGH_VELOCITY_DRAIN_PATTERN")
            
        return round(net_flow, 2)

    def detect_circular_transfers(self, ledger_entries: List[Dict]) -> bool:
        # Detect circular round-trip deposits between related accounts
        seen_hashes = set()
        for entry in ledger_entries:
            key = f"{entry['counterparty']}_{entry['amount']}"
            if key in seen_hashes:
                return True
            seen_hashes.add(key)
        return False`,
    },
  };

  const currentFile = files[activeTab] || files.safenest;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-neutral-200 font-mono text-xs select-text win-scrollbar overflow-hidden">
      {/* File Tabs */}
      <div className="bg-[#252526] flex items-center border-b border-[#181818] overflow-x-auto select-none">
        {Object.entries(files).map(([key, f]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 flex items-center space-x-2 text-xs border-r border-[#1e1e1e] cursor-pointer transition-colors ${
              activeTab === key
                ? "bg-[#1e1e1e] text-white font-bold border-t-2 border-t-blue-500"
                : "text-neutral-400 hover:bg-[#2a2d2e]"
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-blue-400" />
            <span>{f.name}</span>
          </button>
        ))}
      </div>

      {/* Editor Sub-header */}
      <div className="bg-[#2d2d2d] px-4 py-1 text-[11px] text-neutral-400 flex items-center justify-between border-b border-[#181818] select-none">
        <span className="font-semibold text-neutral-300">{currentFile.lang}</span>
        <div className="flex items-center space-x-2 text-neutral-400">
          <span className="text-emerald-400 flex items-center space-x-1">
            <Play className="w-3 h-3" />
            <span>Ready</span>
          </span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
      </div>

      {/* Code Text Body with Line Numbers */}
      <div className="flex-1 overflow-auto p-4 flex font-mono leading-relaxed bg-[#1e1e1e] win-scrollbar">
        {/* Line numbers */}
        <div className="pr-4 select-none text-neutral-600 text-right space-y-0.5 border-r border-neutral-700">
          {currentFile.code.split("\n").map((_, i) => (
            <div key={i} className="text-[11px]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="pl-4 text-neutral-200 text-xs overflow-x-auto whitespace-pre font-mono">
          {currentFile.code}
        </pre>
      </div>

      {/* Status Bar */}
      <div className="bg-[#007acc] text-white px-3 py-0.5 text-[10px] flex items-center justify-between select-none">
        <span className="flex items-center space-x-1">
          <Terminal className="w-3 h-3" />
          <span>Workspace: Harish_Labs_Firmware &bull; Git: master</span>
        </span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
};
