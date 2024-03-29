USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Experience_Select_ById]    Script Date: 12/6/2023 11:58:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 12/2/2023
-- Description:	Select Experience record by Id from dbo.Experience
-- Code Reviewer: Thane Thompson

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Experience_Select_ById]
	@Id int


/* Test Code

declare @Id int = 1;
execute dbo.Experience_Select_ById @Id

*/




as

Begin

SELECT e.Id
	  ,UserId
	  ,ExperienceTypeId
	  ,et.Name
      ,[IsCurrent]
      ,[StartDate]
      ,[EndDate]
      ,[JobTitle]
      ,[CompanyName]
      ,[City]
      ,[State]
      ,[Country]
      ,[Description]
  FROM [dbo].[Experience] as e
  inner join dbo.ExperienceTypes as et
  on e.ExperienceTypeId = et.Id
  Where e.Id = @Id

End


GO
