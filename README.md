# Previsão de Vendas no Varejo - Pipeline de Dados 

Este projeto tem como objetivo processar e estruturar dados de vendas no varejo (Favorita Stores no Equador, de 2013 à 2017) (extraídos do Kaggle: https://www.kaggle.com/competitions/store-sales-time-series-forecasting/data) para alimentar um dashboard analítico no Power BI. O pipeline desenvolvido em Python realiza a consolidação de múltiplas bases dimensionais (lojas, feriados e preços do petróleo) em uma única tabela fato otimizada. *Obs: Um dos focos do projeto é extrair os valores para analisar o impacto de um terremoto (Acontecido ocorreu em 16 de Abril de 2016 com uma amplitude de 7.8 na escala Richter) em vendas do varejo.

# Estrutura do Projeto

O repositório está organizado da seguinte forma:

```text
StoreDatabasesExtraction/
│
├── Data/
│   ├── Raw/                 # Dados brutos originais (.csv) 
│   └── Processed/           # Dados limpos consolidados (.parquet) 
│
├── src/                     
│   └── data_pipeline.py     # Script principal de ETL
│
├── .gitignore               
├── requirements.txt         
└── README.md             

