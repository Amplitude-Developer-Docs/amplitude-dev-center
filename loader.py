from llama_index import download_loader, GPTSimpleVectorIndex
from llama_index.node_parser import SimpleNodeParser

SimpleDirectoryReader = download_loader("SimpleDirectoryReader")
parser = SimpleNodeParser()
nodes = []

analytics_documents = SimpleDirectoryReader('./site/analytics', recursive=True, exclude_hidden=True, file_extractor={".html": "UnstructuredReader"}).load_data()
nodes += parser.get_nodes_from_documents(analytics_documents)

data_documents = SimpleDirectoryReader('./site/data', recursive=True, exclude_hidden=True, file_extractor={".html": "UnstructuredReader"}).load_data()
nodes += parser.get_nodes_from_documents(data_documents)

experiment_documents = SimpleDirectoryReader('./site/data', recursive=True, exclude_hidden=True, file_extractor={".html": "UnstructuredReader"}).load_data()
nodes += parser.get_nodes_from_documents(experiment_documents)

index = GPTSimpleVectorIndex(nodes)
index.save_to_disk('index.json')
