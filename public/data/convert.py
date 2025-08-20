# import os, argparse, pdfplumber, pandas as pd

# def normalize(s):
#     if not s: return ""
#     return "\n".join(line.strip() for line in s.splitlines() if line.strip())

# def table_md(table):
#     df = pd.DataFrame(table)
#     if df.empty: return ""
#     df.columns = [str(c).strip() or f"col{i+1}" for i,c in enumerate(df.iloc[0])] if len(df)>0 else df.columns
#     df = df[1:] if len(df)>1 else df
#     return df.to_markdown(index=False)

# def convert_one(pdf_path, out_dir):
#     name = os.path.splitext(os.path.basename(pdf_path))[0]
#     out_path = os.path.join(out_dir, f"{name}.md")
#     parts = [f"# {name}"]
#     with pdfplumber.open(pdf_path) as pdf:
#         for i, page in enumerate(pdf.pages, start=1):
#             text = normalize(page.extract_text() or "")
#             parts.append(f"\n\n## Page {i}\n")
#             if text: parts.append(text)
#             tables = page.extract_tables() or []
#             for t_idx, t in enumerate(tables, start=1):
#                 md = table_md(t)
#                 if md:
#                     parts.append(f"\n\n**Table {i}-{t_idx}**\n\n{md}")
#     os.makedirs(out_dir, exist_ok=True)
#     with open(out_path, "w", encoding="utf-8") as f:
#         f.write("\n".join(parts))
#     return out_path

# def main():
#     p = argparse.ArgumentParser()
#     p.add_argument("--in", dest="inp", required=True)
#     p.add_argument("--out", dest="out", required=True)
#     args = p.parse_args()
#     in_dir, out_dir = os.path.abspath(args.inp), os.path.abspath(args.out)
#     os.makedirs(out_dir, exist_ok=True)
#     pdfs = [os.path.join(in_dir,f) for f in os.listdir(in_dir) if f.lower().endswith(".pdf")]
#     results = []
#     for pth in sorted(pdfs):
#         try:
#             results.append(convert_one(pth, out_dir))
#         except Exception as e:
#             print("FAIL:", os.path.basename(pth), "-", e)
#     print("OK:", len(results), "files →", out_dir)

# if __name__ == "__main__":
#     main()