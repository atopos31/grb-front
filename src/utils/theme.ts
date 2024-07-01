export const GetDefaultThemeIsdark = () => {
    //用户初次访问 使用系统主题
    const SysDefultTheme = window.matchMedia("(prefers-color-scheme: light)")
        .matches
        ? false
        : true;

    //如果访问过 有记录的话 优先用户的选择
    const localDefultTheme = localStorage.getItem("theme-mode");
    const defultTheme = localDefultTheme
        ? localDefultTheme === "dark"
        : SysDefultTheme;
    return defultTheme;
}
