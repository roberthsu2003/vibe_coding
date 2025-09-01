vibe_coding FastAPI template

Quickstart

1. Create and activate the conda environment:

```zsh
conda create -n vibe_coding python=3.10 -y
conda activate vibe_coding
```

2. Install dependencies:

```zsh
pip install -r requirements.txt
```

3. Run the app:

```zsh
uvicorn main:app --reload --port 8000
```

4. Run tests:

```zsh
pytest -q
```
