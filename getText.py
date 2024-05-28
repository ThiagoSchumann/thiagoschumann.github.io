import os

def read_files(base_directory):
    files_text = {}
    
    for root, dirs, files in os.walk(base_directory):
        # Excluir os diretórios /images e /resources
        if '/images' in root or '/resources' in root:
            continue
        
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    files_text[file_path] = f.read()
            except Exception as e:
                print(f"Não foi possível ler o arquivo {file_path}: {e}")
    
    return files_text

if __name__ == "__main__":
    base_directory = 'C:\\Projects\\thiagoschumann.github.io'  # Substitua pelo caminho do seu diretório
    output_file = 'output.txt'  # Nome do arquivo de saída
    
    files_text = read_files(base_directory)
    
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for file_path, text in files_text.items():
            out_file.write(f"Conteúdo do arquivo {file_path}:\n{text}\n")
    
    print(f"O conteúdo dos arquivos foi gravado em {output_file}")
