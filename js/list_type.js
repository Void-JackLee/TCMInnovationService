const t_which = {
    "news": 1,
    "notify": 2
};
const type = getAttr("type");
const ntype = t_which[type];

var d_title = "";

if (ntype === 1) d_title = "大赛新闻";
else if (ntype === 2) d_title = "大赛通知";

document.title = d_title + " - 全国中医药高等院校大学生创新创业大赛";