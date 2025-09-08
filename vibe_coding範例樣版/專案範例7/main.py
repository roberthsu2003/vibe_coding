# -*- coding: utf-8 -*-

import re
from collections import Counter
from typing import List, Dict

SOURCE_FILENAME: str = "CONTRIBUTING.md"
OUTPUT_FILENAME: str = "contribution_summary.txt"

def read_file_content(filepath: str) -> str:
    """
    讀取指定路徑的檔案內容。

    Args:
        filepath: 檔案的路徑。

    Returns:
        檔案的內容字串。

    Raises:
        FileNotFoundError: 如果檔案不存在。
        IOError: 如果發生其他讀取錯誤。
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"錯誤：找不到檔案 '{filepath}'。")
        raise
    except IOError as e:
        print(f"讀取檔案 '{filepath}' 時發生錯誤：{e}")
        raise

def analyze_commit_types(content: str) -> Dict[str, int]:
    """
    從內容中分析 Conventional Commits 的類型並計數。

    Args:
        content: 包含提交訊息範例的文字內容。

    Returns:
        一個字典，鍵為 commit 類型，值為其出現次數。
    """
    
    commit_types: List[str] = [
        "feat", "fix", "docs", "style",
        "refactor", "perf", "test", "chore"
    ]
    
   
    pattern = re.compile(r'\b(' + '|'.join(commit_types) + r')\b(?=\(.+\):)')
    
    found_types = pattern.findall(content)
    
    return Counter(found_types)

def generate_summary_report(analysis: Dict[str, int]) -> str:
    """
    根據分析結果生成摘要報告。

    Args:
        analysis: 包含 commit 類型計數的字典。

    Returns:
        格式化後的報告字串。
    """
    report_lines: List[str] = ["# 貢獻指南分析報告\n\n"]
    report_lines.append(f"在 `{SOURCE_FILENAME}` 中找到的 Conventional Commit 範例類型分析：\n\n")

    if not analysis:
        report_lines.append("未找到任何符合規範的 commit 範例。\n")
        return "".join(report_lines)

    total_examples = sum(analysis.values())
    report_lines.append(f"總共找到 {total_examples} 個範例。\n\n")
    report_lines.append("| Commit 類型 | 範例數量 |\n")
    report_lines.append("|-------------|----------|\n")

    for commit_type, count in sorted(analysis.items()):
        report_lines.append(f"| `{commit_type}` | {count} |\n")
        
    report_lines.append("\n---\n")
    report_lines.append("這份報告是透過 `main.py` 自動生成的，旨在演示檔案讀寫與內容分析。\n")
    return "".join(report_lines)

def write_report_to_file(filepath: str, report: str) -> None:
    """
    將報告寫入指定的檔案。

    Args:
        filepath: 輸出檔案的路徑。
        report: 要寫入的報告內容。
    """
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(report)
        print(f"成功生成報告並儲存至 '{filepath}'。")
    except IOError as e:
        print(f"寫入檔案 '{filepath}' 時發生錯誤：{e}")

def main():
    """
    主執行函數，協調整個流程：
    1. 讀取檔案
    2. 分析內容
    3. 生成報告
    4. 寫入檔案
    """
    print("開始執行檔案讀寫與分析腳本...")
    try:
        # 步驟 1: 讀取貢獻指南檔案
        content = read_file_content(SOURCE_FILENAME)
        
        # 步驟 2: 分析內容以找出 commit 類型
        commit_type_counts = analyze_commit_types(content)
        
        # 步驟 3: 根據分析結果生成報告
        summary_report = generate_summary_report(commit_type_counts)
        
        # 步驟 4: 將報告寫入新的檔案
        write_report_to_file(OUTPUT_FILENAME, summary_report)
        
    except FileNotFoundError:
        print(f"執行中斷，因為來源檔案 '{SOURCE_FILENAME}' 不存在。")
    except Exception as e:
        print(f"腳本執行過程中發生未預期的錯誤：{e}")
    finally:
        print("腳本執行完畢。")

if __name__ == "__main__":
    main()
