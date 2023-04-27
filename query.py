from llama_index import GPTSimpleVectorIndex

index = GPTSimpleVectorIndex.load_from_disk('index.json')

out = index.query('Provide a summary of Amplitude Experiment.')

print(out)