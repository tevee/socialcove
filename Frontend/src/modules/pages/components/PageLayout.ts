// the PageLayout class manages the layout of pages with standard structure 
// including header, left navigation, main content, and sidebar
// 
// The class is accessed in display...Page files
//
// -  create method (async): Creates the page layout and inserts the provided main content, 
//    which should be wrapped in a <main> tag
//    userNoticeboard is in the sidebar by default
// -  populateSidebar method: Appends the provided items to the sidebar content
// -  repopulateSidebar method: Updates the sidebar content with the provided items.

import Header from "./Header.js";
import MainNav from "./MainNav.js";
import Sidebar from "./Sidebar.js";
import UserNoticeboard from "./UserNoticeboard.js";

export default class PageLayout{

  private sidebar: HTMLElement;
  private sidebarContentContainer: HTMLElement;
  private userNoticeboard: HTMLElement;

  constructor(){}

  public async create(main: HTMLElement):Promise<void>{
    this.userNoticeboard = await UserNoticeboard.create();
    this.sidebar = Sidebar.create([this.userNoticeboard]);
    this.sidebarContentContainer = this.sidebar.querySelector(".sidebar") as HTMLElement;

    document.body.append(
      await Header.create(),
      await MainNav.create(),
      main, 
      this.sidebar
    );

  }

  public repopulateSideBar(itemsArr: HTMLElement[]):void{
    this.clearSidebar();

    this.populateSidebar(itemsArr);

  }

  public populateSidebar(itemsArr: HTMLElement[]) :void{
    for (const item of itemsArr) {
      this.sidebarContentContainer.append(item);
    }
  }

  private clearSidebar(){
    this.sidebarContentContainer.innerHTML = "";
  }
}