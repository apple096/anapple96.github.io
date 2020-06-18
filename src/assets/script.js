'use strict';
const $ = a => document.querySelector(a),
    $$ = a => document.querySelectorAll(a),
    setStrongestAndWeakestFamiliar = () => {
        const a = Array.from($$(".familiars tbody tr:not(.invisible), .fusions tbody tr:not(.invisible)"));
        if (0 !== a.length) {
            $$(".strongest").forEach(a => a.classList.remove("strongest")), $$(".weakest").forEach(a => a.classList.remove("weakest"));
            for (let c = 3; 6 > c; c++) {
                const b = a.sort((d, a) => a.children[c].textContent - d.children[c].textContent);
                b[0].children[c].classList.add("strongest"), b[[b.length - 1]].children[c].classList.add("weakest")
            }
        }
    };

function cleanTableHead(a) {
    a.classList.remove("focus"), this === a.id && (a.classList.contains("asc") ? a.classList.replace("asc", "desc") : a.classList.replace("desc", "asc"), a.classList.add("focus"))
}
const sortTableRow = a => {
        const c = a.currentTarget,
            {
                id: d
            } = c;
        let b = [];
        b = c.classList.contains("number") ? Array.from($$("tbody tr")).sort((d, a) => a.children[c.cellIndex].textContent - d.children[c.cellIndex].textContent) : Array.from($$("tbody tr")).sort((d, a) => {
            const b = d.children[c.cellIndex].textContent.normalize("NFD").replace(/[\u0300-\u036f| |']/g, ""),
                e = a.children[c.cellIndex].textContent.normalize("NFD").replace(/[\u0300-\u036f| |']/g, "");
            return b < e ? -1 : b > e ? 1 : 0
        }), c.classList.contains("desc") && b.reverse();
        for (let c = 0; c < b.length; c++) $("tbody").appendChild(b[c]);
        $$("th").forEach(cleanTableHead, d)
    },
    selectRows = () => {
        const a = {};
        $$("select").forEach(b => {
            a[b.name] = {
                content: b.value
            }
        }), $$("tbody tr").forEach(b => {
            let c = !0,
                d = !0,
                e = !0,
                f = !0,
                g = !0,
                h = !0,
                i = !0,
                j = !0;
            a.selectType && "all" !== a.selectType.content && b.classList[0] !== a.selectType.content && (c = !1), !a.selectSkill || ("all" === a.selectSkill.content || b.dataset.rawSkills.split(",").some(b => b.slice(2) === a.selectSkill.content)) && ("all" === a.selectSkill.content || "all" === a.selectSkillPoint.content || b.dataset.rawSkills.split(",").some(b => b.slice(2) === a.selectSkill.content && b.slice(0, 1) === a.selectSkillPoint.content)) && ("all" === a.selectSkillPoint.content || b.dataset.rawSkills.split(",").some(b => b.slice(0, 1) === a.selectSkillPoint.content)) || (d = !1), a.selectZone && "all" !== a.selectZone.content && b.dataset.rawZone !== a.selectZone.content && (e = !1), a.selectTier && "all" !== a.selectTier.content && b.dataset.rawTier !== a.selectTier.content && (i = !1), a.selectWeaponType && "all" !== a.selectWeaponType.content && b.dataset.rawWeaponType !== a.selectWeaponType.content && (j = !1), a.selectPassiveAbility && "all" !== a.selectPassiveAbility.content && !b.dataset.rawPassiveAbilities.split(",").some(b => b === a.selectPassiveAbility.content) && (f = !1), a.selectSchematicPlace && "all" !== a.selectSchematicPlace.content && b.dataset.rawSchematicPlace !== a.selectSchematicPlace.content && (g = !1), a.selectFusion && "all" !== a.selectFusion.content && (c = !0, d = !0, e = !0, f = !0, g = !0, i = !0, j = !0, !b.dataset.rawFusion.split(",").some(b => b === a.selectFusion.content) && (h = !1)), c && d && e && f && g && h && i && j ? b.classList.remove("invisible") : b.classList.add("invisible")
        }), $$("tbody span").forEach(b => {
            b.classList.remove("highlight"), (a.selectSkill && b.textContent === a.selectSkill.content || a.selectPassiveAbility && b.textContent === a.selectPassiveAbility.content || a.selectZone && b.textContent === a.selectZone.content || a.selectSchematicPlace && b.textContent === a.selectSchematicPlace.content || a.selectTier && b.textContent === a.selectTier.content || a.selectWeaponType && b.textContent === a.selectWeaponType.content) && b.classList.add("highlight")
        }), $$("#count").forEach(a => {
            a.innerHTML = $$("tbody tr").length - $$("tr.invisible").length
        }), setStrongestAndWeakestFamiliar()
    },
    reset = () => {
        $$("select").forEach(a => {
            const b = new Event("change");
            a.value = "all", a.dispatchEvent(b)
        }), $(".reroll-formula") && ($(".reroll-formula").innerHTML = "")
    },
    showRerollFormula = a => {
        let b = 2,
            c = "100 <img src=\"/common-material.png\" alt=\"Common material\">";
        "rare" === a.currentTarget.value ? (b = 8, c = "50 <img src=\"/rare-material.png\" alt=\"Rare material\">") : "epic" === a.currentTarget.value ? (b = 40, c = "4 <img src=\"/epic-material.png\" alt=\"Epic material\">") : "legendary" === a.currentTarget.value && (b = 200, c = "10 <img src=\"/epic-material.png\" alt=\"Epic material\">"), $(".reroll-formula").innerHTML = `Reroll's formula: [nth-reroll] * <b>${b}</b> <img src="/mount-guts.png" alt="Mount guts"> + [nth-reroll] * <b>${c}</b>`
    };
$(".submit").classList.add("invisible"), $(".reset").addEventListener("click", reset), $$("select").forEach(a => a.addEventListener("change", selectRows)), $$(".mounts select").forEach(a => a.addEventListener("change", showRerollFormula)), $$("th.asc, th.desc").forEach(a => a.addEventListener("click", sortTableRow)); // For responsive.
const labels = Array.from($$("thead th")).map(a => a.innerText);
$$(".table td").forEach((a, b) => {
    a.setAttribute("data-label", labels[b % labels.length])
}), setStrongestAndWeakestFamiliar();
