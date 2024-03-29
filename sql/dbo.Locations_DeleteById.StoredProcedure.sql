USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Locations_DeleteById]    Script Date: 11/21/2023 6:06:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 11/16/2023
-- Description:	Delete Location record by Id from dbo.Locations
-- Code Reviewer: Kelvin Hannah

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Locations_DeleteById]
	@Id int

/*  Test code

Declare @Id int = 1;

execute dbo.Locations_SelectAll_Paginated 
@PageIndex = 0, @PageSize = 5


Execute dbo.Locations_DeleteById @Id

execute dbo.Locations_SelectAll_Paginated 
@PageIndex = 0, @PageSize = 5;



*/

as

Begin

DELETE FROM [dbo].[Locations]
      WHERE Id = @Id;

End

GO
