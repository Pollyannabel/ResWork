USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Experience_Delete_ById]    Script Date: 12/6/2023 11:58:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 12/2/2023
-- Description:	Delete Experience record by Id from dbo.Experience
-- Code Reviewer: Thane Thompson

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Experience_Delete_ById]
	@Id int

/* Test Code

execute dbo.Experience_Select_All_Paginated @PageIndex = 0, @PageSize = 5

declare @Id int = 1
execute dbo.Experience_Delete_ById @Id

execute dbo.Experience_Select_All_Paginated @PageIndex = 0, @PageSize = 5

*/

as

BEGIN

DELETE FROM [dbo].[Experience]
      WHERE Id = @Id;

END

GO
