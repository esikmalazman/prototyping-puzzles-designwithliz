"use client";

// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import styles from './styles.module.css';
import { monthlyExpenses, incomeData, savingsHistory } from './data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const PALETTE = {
  indigo:  '#6366f1',
  violet:  '#8b5cf6',
  cyan:    '#06b6d4',
  teal:    '#14b8a6',
  amber:   '#f59e0b',
  rose:    '#f43f5e',
  emerald: '#10b981',
};

export default function FinanceDashboard() {
  const totalIncome = Object.values(incomeData).reduce((acc, curr) => acc + curr, 0);
  const totalExpenses = Object.values(monthlyExpenses.march).reduce((acc, curr) => acc + curr, 0);

  const expenseChartData = {
    labels: Object.keys(monthlyExpenses.march),
    datasets: [{
      label: 'March expenses',
      data: Object.values(monthlyExpenses.march),
      backgroundColor: Object.values(PALETTE),
      borderRadius: 6,
      borderSkipped: false,
    }]
  };

  const incomeChartData = {
    labels: Object.keys(incomeData),
    datasets: [{
      data: Object.values(incomeData),
      backgroundColor: [PALETTE.indigo, PALETTE.violet, PALETTE.cyan],
    }]
  };

  const savingsChartData = {
    labels: savingsHistory.map(item => item.month),
    datasets: [{
      label: 'Monthly savings',
      data: savingsHistory.map(item => item.amount),
      borderColor: PALETTE.emerald,
      backgroundColor: 'rgba(16, 185, 129, 0.06)',
      pointBackgroundColor: PALETTE.emerald,
      tension: 0.4,
      fill: true,
    }]
  };

  const netSavings = totalIncome - totalExpenses;
  const savingsRate = Math.round((netSavings / totalIncome) * 100);

  const tooltipDefaults = {
    backgroundColor: '#0f172a',
    titleColor: '#94a3b8',
    bodyColor: '#ffffff',
    padding: 10,
    cornerRadius: 8,
  };

  const scaleDefaults = {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#94a3b8', font: { size: 11 } },
    },
    y: {
      grid: { color: '#e8eaf0' },
      border: { display: false, dash: [4, 4] },
      ticks: { color: '#94a3b8', font: { size: 11 } },
    },
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Personal finance</h1>
        <span className={styles.periodPill}>March 2025</span>
      </header>

      <div className={styles.dashboard}>

        {/* Zone 1 — Key metrics */}
        <div className={styles.metricsRow}>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Total income</span>
            <span className={styles.metricValue}>${totalIncome.toLocaleString()}</span>
            <span className={`${styles.badge} ${styles.badgeGreen}`}>↑ This month</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Total expenses</span>
            <span className={styles.metricValue}>${totalExpenses.toLocaleString()}</span>
            <span className={`${styles.badge} ${styles.badgeRed}`}>↓ Spending</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Net saved</span>
            <span className={styles.metricValue}>${netSavings.toLocaleString()}</span>
            <span className={`${styles.badge} ${styles.badgeGreen}`}>{savingsRate}% savings rate</span>
          </div>
        </div>

        {/* Zone 2 — Breakdown charts */}
        <div className={styles.chartsRow}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Expense breakdown</h2>
            <div className={styles.chartContainer}>
              <Bar
                data={expenseChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false }, tooltip: tooltipDefaults },
                  scales: scaleDefaults,
                }}
              />
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Income sources</h2>
            <div className={styles.chartContainer}>
              <Doughnut
                data={incomeChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '72%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { color: '#94a3b8', font: { size: 12 }, padding: 16, boxWidth: 10, boxHeight: 10 },
                    },
                    tooltip: tooltipDefaults,
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Zone 3 — Trend (full width) */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Savings trend</h2>
          <div className={styles.chartContainerTall}>
            <Line
              data={{
                ...savingsChartData,
                datasets: [{ ...savingsChartData.datasets[0], pointRadius: 4, pointHoverRadius: 6, borderWidth: 2 }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: tooltipDefaults },
                scales: scaleDefaults,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
} 