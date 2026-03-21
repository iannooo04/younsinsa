import os
import re

base_dir = "/Users/noian/Desktop/project/yunsinsa/src/app/[locale]/(admin)/admin/orders"

target_files = [
    "page.tsx",
    "payment-confirm/page.tsx",
    "deposit-wait/page.tsx",
    "delivery-complete/page.tsx",
    "purchase-confirm/page.tsx",
    "product-prep/page.tsx",
    "in-delivery/page.tsx",
    "payment-fail/page.tsx"
]

def remove_kr_cn_store(content: str) -> str:
    # Removing just the KR and CN divs. These are self-contained lines or short blocks usually.
    # To be safe, we find "<RadioGroupItem value=\"KR\"" and remove the parent <div className="flex items-center gap-1.5">
    
    while True:
        idx_kr = content.find('value="KR"')
        if idx_kr == -1:
            break
        # find the start of the surrounding div
        start_kr = content.rfind('<div', 0, idx_kr)
        # find the end of the surrounding div
        end_kr = content.find('</div>', idx_kr) + 6
        content = content[:start_kr] + content[end_kr:]
        
    while True:
        idx_cn = content.find('value="CN"')
        if idx_cn == -1:
            break
        start_cn = content.rfind('<div', 0, idx_cn)
        end_cn = content.find('</div>', idx_cn) + 6
        content = content[:start_cn] + content[end_cn:]
        
    return content

def remove_pc_mobile_order_type(content: str) -> str:
    targets = ['id="order-type-pc"', 'id="order-type-mobile"', 'id="order-type-web"', 'id="order-type-app"']
    for t in targets:
        while True:
            idx = content.find(t)
            if idx == -1:
                break
            # Find closest parent div
            # Wait, order-type-web and order-type-app are grouped together in one div like:
            # <div className="flex items-center gap-1.5 text-gray-500">
            #     ( <Checkbox id="order-type-web" ... /> <Label ...>WEB</Label>
            #       <Checkbox id="order-type-app" ... /> <Label ...>APP</Label> )
            # </div>
            start = content.rfind('<div', 0, idx)
            end = content.find('</div>', idx) + 6
            content = content[:start] + content[end:]
    return content

def remove_supplier_type(content: str) -> str:
    marker = "{/* Supplier Type */}"
    if marker not in content:
        return content
    idx = content.find(marker)
    
    # Let's write a simple bracket matcher
    # We search forward for the first '<div' after the marker.
    start_div = content.find('<div', idx)
    
    # Now we iterate through string starting from start_div
    # Count '<div' as +1 and '</div' as -1. When count is 0, we found the matching end.
    count = 0
    i = start_div
    
    while i < len(content):
        # find next tag
        next_open = content.find('<div', i)
        next_close = content.find('</div', i)
        
        if next_open != -1 and next_open < next_close:
            count += 1
            i = next_open + 4
        elif next_close != -1:
            count -= 1
            i = next_close + 5
            # To account for closing bracket '>', find the end
            end_bracket = content.find('>', i)
            i = end_bracket + 1
            if count == 0:
                # We reached the end
                break
        else:
            break

    end_idx = i
    
    # remove the block including the marker line
    # Find the start of the line containing the marker
    line_start = content.rfind('\n', 0, idx)
    if line_start == -1: line_start = 0
    
    content = content[:line_start] + content[end_idx:]
    return content


for f in target_files:
    file_path = os.path.join(base_dir, f)
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        content = remove_supplier_type(content)
        content = remove_kr_cn_store(content)
        content = remove_pc_mobile_order_type(content)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Processed {f}")
    else:
        print(f"File not found: {f}")
