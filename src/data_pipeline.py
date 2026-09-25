## Teste Inicial de Pipeline de Dados

import pandas as pd
import os

def load_data(Data):
    # Carregamento das bases
    train = pd.read_csv(f'{Data}/train.csv')
    stores = pd.read_csv(f'{Data}/stores.csv')
    oil = pd.read_csv(f'{Data}/oil.csv')
    holidays = pd.read_csv(f'{Data}/holidays_events.csv')
    return train, stores, oil, holidays

def clean_and_merge(train, stores, oil, holidays):
    # Renomear as colunas 'type' antes de qualquer merge para evitar conflitos (type_x / type_y)
    stores = stores.rename(columns={'type': 'store_type'})
    holidays = holidays.rename(columns={'type': 'holiday_type'})

    # Convertendo as colunas de data
    train['date'] = pd.to_datetime(train['date'])
    oil['date'] = pd.to_datetime(oil['date'])
    holidays['date'] = pd.to_datetime(holidays['date'])

    # Tratando série do petróleo (preencher furos de finais de semana)
    oil_full = pd.DataFrame({'date': pd.date_range(start=train['date'].min(), end=train['date'].max())})
    oil = pd.merge(oil_full, oil, on='date', how='left')
    oil['dcoilwtico'] = oil['dcoilwtico'].ffill().bfill() 

    # Tratando feriados (filtrar apenas os não transferidos)
    holidays = holidays[holidays['transferred'] == False]
    holidays = holidays.drop_duplicates(subset=['date'], keep='first')
    
    # Consolida tudo na tabela de treino
    df_merged = pd.merge(train, stores, on='store_nbr', how='left')
    df_merged = pd.merge(df_merged, oil, on='date', how='left')
    # Agora buscamos a coluna 'holiday_type' recém-renomeada
    df_merged = pd.merge(df_merged, holidays[['date', 'holiday_type', 'description']], on='date', how='left')
    
    # 5. Engenharia de Features de Datas
    # A verificação agora é feita na coluna correta do feriado
    df_merged['is_holiday'] = df_merged['holiday_type'].notna().astype(int)
    
    df_merged.rename(columns={'dcoilwtico': 'oil_price'}, inplace=True)
    df_merged['holiday_type'] = df_merged['holiday_type'].fillna('No Holiday')
    df_merged['description'] = df_merged['description'].fillna('None')

    return df_merged

def export_data(df, processed_path):
    # Cria a pasta automaticamente se ela não existir ainda
    os.makedirs(processed_path, exist_ok=True)
    
    # Parquet é mais eficiente em espaço e leitura pelo Power BI do que CSV
    output_file = f'{processed_path}/dataset_consolidado.parquet'
    df.to_parquet(output_file, index=False)
    print(f"Dados exportados com sucesso para: {output_file}")

if __name__ == "__main__":
    RAW_DIR = 'Data/Raw'
    PROCESSED_DIR = 'Data/Processed'
    
    print("Iniciando carregamento...")
    train, stores, oil, holidays = load_data(RAW_DIR)
    
    print("Processando e consolidando dados...")
    df_final = clean_and_merge(train, stores, oil, holidays)
    
    print("Exportando arquivo...")
    export_data(df_final, PROCESSED_DIR)