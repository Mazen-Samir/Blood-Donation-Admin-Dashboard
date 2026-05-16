import { Component, OnInit,  PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-ai-prediction',
  imports: [ChartModule],
  templateUrl: './ai-prediction.html',
  styleUrl: './ai-prediction.css',
})
export class AiPrediction implements OnInit{

    // ********************** LINE CHART **********************

    data: any;
    options: any;
    // platformId = inject(PLATFORM_ID);
    // configService = inject(AppConfigService);
    // designerService = inject(DesignerService);

    ngOnInit() {
        this.initChart();
        this.initBarChart();
        console.log("AI Prediction Component Initialized");
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-black-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
    
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'A+',
                    data: [30, 35, 40, 40, 50, 47, 45],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-blue-500'),
                    tension: 0.4
                },
                {
                    label: 'B+',
                    data: [20, 30, 17, 35, 30, 26, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-green-500'),
                    tension: 0.4
                },
                {
                    label: 'O+',
                    data: [15, 17, 20, 15, 25, 20, 29],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-red-500'),
                    tension: 0.4
                },
                {
                    label: 'AB+',
                    data: [7, 11, 10, 15, 13, 11, 25],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-yellow-500'),
                    tension: 0.4
                },
            ]
        };
    
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        // color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        // color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

    }

    // ********************** BAR CHART **********************

    barChart_data: any;
    barChart_options: any;
    // platformId = inject(PLATFORM_ID);
    // configService = inject(AppConfigService);
    // designerService = inject(DesignerService);

    initBarChart() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-black-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        
            this.barChart_data = {
                labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                datasets: [
                    {
                        label: 'Predicted Demand (units)',
                        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        data: [65, 59, 80, 85, 56, 55, 40, 50]
                    },
                ]
            };
        
            this.barChart_options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'red',
                            font: {
                                size: 14,
                                weight: 600
                            }
                        },
                        grid: {
                            // color: surfaceBorder,
                            drawBorder: false
                        }
                    }, 
                    y: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                size: 14,
                                weight: 500
                            }
                        },
                        grid: {
                            // color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
    }
}
