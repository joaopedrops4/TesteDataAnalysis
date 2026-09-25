# Previsão de Vendas no Varejo - Pipeline de Dados 

Este projeto tem como objetivo processar e estruturar dados de vendas no varejo (extraídos do Kaggle) para alimentar um dashboard analítico no Power BI. O pipeline desenvolvido em Python realiza a consolidação de múltiplas bases dimensionais (lojas, feriados e preços do petróleo) em uma única tabela fato otimizada.

# Estrutura do Projeto

O repositório está organizado da seguinte forma:

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

