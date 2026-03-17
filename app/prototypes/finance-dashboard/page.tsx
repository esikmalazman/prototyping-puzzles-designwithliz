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
import { monthlyExpenses, incomeData, savingsHistory, categoryColors } from './data';

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

export default function FinanceDashboard() {
  // Calculate total income and expenses
  const totalIncome = Object.values(incomeData).reduce((acc, curr) => acc + curr, 0);
  const totalExpenses = Object.values(monthlyExpenses.march).reduce((acc, curr) => acc + curr, 0);

  // Prepare data for monthly expenses chart
  const expenseChartData = {
    labels: Object.keys(monthlyExpenses.march),
    datasets: [{
      label: 'March expenses',
      data: Object.values(monthlyExpenses.march),
      backgroundColor: Object.values(categoryColors),
    }]
  };

  // Prepare data for income breakdown
  const incomeChartData = {
    labels: Object.keys(incomeData),
    datasets: [{
      data: Object.values(incomeData),
      backgroundColor: ['#2ecc71', '#3498db', '#9b59b6'],
    }]
  };

  // Prepare data for savings trend
  const savingsChartData = {
    labels: savingsHistory.map(item => item.month),
    datasets: [{
      label: 'Monthly savings',
      data: savingsHistory.map(item => item.amount),
      borderColor: '#2ecc71',
      tension: 0.4,
      fill: false,
    }]
  };

  const netSavings = totalIncome - totalExpenses;
  const savingsRate = Math.round((netSavings / totalIncome) * 100);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Personal finance</h1>
        <p className={styles.subtitle}>March 2025 · Overview</p>
      </header>

      <div className={styles.dashboard}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Monthly overview</h2>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total income</span>
              <span className={styles.totalIncome}>${totalIncome.toLocaleString()}</span>
              <span className={`${styles.badge} ${styles.badgeGreen}`}>↑ Income</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total expenses</span>
              <span className={styles.totalExpenses}>${totalExpenses.toLocaleString()}</span>
              <span className={`${styles.badge} ${styles.badgeRed}`}>↓ Spending</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Net saved</span>
              <span className={styles.totalIncome}>${netSavings.toLocaleString()}</span>
              <span className={`${styles.badge} ${styles.badgeGreen}`}>{savingsRate}% savings rate</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Expense breakdown</h2>
          <div className={styles.chartContainer}>
            <Bar 
              data={expenseChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: '#0f172a',
                    titleColor: '#94a3b8',
                    bodyColor: '#ffffff',
                    padding: 10,
                    cornerRadius: 8,
                  },
                },
                scales: {
                  x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { color: '#94a3b8', font: { size: 11 } },
                  },
                  y: {
                    grid: { color: '#f1f5f9' },
                    border: { display: false, dash: [4, 4] },
                    ticks: { color: '#94a3b8', font: { size: 11 } },
                  },
                },
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
                    labels: {
                      color: '#64748b',
                      font: { size: 12 },
                      padding: 16,
                      boxWidth: 10,
                      boxHeight: 10,
                    },
                  },
                  tooltip: {
                    backgroundColor: '#0f172a',
                    titleColor: '#94a3b8',
                    bodyColor: '#ffffff',
                    padding: 10,
                    cornerRadius: 8,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Savings trend</h2>
          <div className={styles.chartContainer}>
            <Line 
              data={{
                ...savingsChartData,
                datasets: [{
                  ...savingsChartData.datasets[0],
                  borderColor: '#6366f1',
                  backgroundColor: 'rgba(99, 102, 241, 0.06)',
                  pointBackgroundColor: '#6366f1',
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  borderWidth: 2,
                  fill: true,
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: '#0f172a',
                    titleColor: '#94a3b8',
                    bodyColor: '#ffffff',
                    padding: 10,
                    cornerRadius: 8,
                  },
                },
                scales: {
                  x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { color: '#94a3b8', font: { size: 11 } },
                  },
                  y: {
                    grid: { color: '#f1f5f9' },
                    border: { display: false, dash: [4, 4] },
                    ticks: { color: '#94a3b8', font: { size: 11 } },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 