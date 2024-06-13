import { useEffect, useState } from "react";
import "./footer.scss";
import { getBadgesInfo } from "../../request/req_siteinfo";

interface badge {
  nameLeft: string;
  nameRight: string;
  href: string;
  logo: string;
  colorRight: string;
}

const Footer = () => {
  const [badges,setBadges] = useState<badge[]>([])
  useEffect(()=>{
    const getBadges = async () => {
      const res = await getBadgesInfo()
      setBadges(res.data)
    }
    getBadges()
  },[])

  return (
    <div className="footer">
      <p className="content">@2022-2024 All Rights Reserved</p>
      <div
        className="badge"
      >
        {/* 了解更多，访问https://shields.io */}
        {badges.map((badge,index) => (
          <a target="_blank" href={badge.href} key={index}>
            <img
              alt="Static Badge"
              src={`https://img.shields.io/badge/${badge.nameLeft}-${badge.nameRight}-${badge.colorRight}?logo=${badge.logo}`}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
