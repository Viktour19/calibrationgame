import json

def main():
    input_file = 'prompts/alpaca_chatgpt.json'
    with open(input_file, 'r') as f:
        data = json.load(f)

    processed_data = [{"user_query": item["user_query"], "hallucination": item["hallucination"]} for item in data if '\\' not in item["user_query"] ]
    output_file = 'processed_data2.json'

    with open(output_file, 'w') as f:
        json.dump(processed_data, f, indent=4)


if __name__ == "__main__":
    main()
